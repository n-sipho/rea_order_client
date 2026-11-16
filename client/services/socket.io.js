module.exports = (io, dbQueries) => {

    io.on("connection", async socket => {
        socket.on('ordered_data', async () => {
            let data = await dbQueries.getPlacedOrders();
            socket.emit('get_data', data);
        });

        // listening for new orders placed
        socket.on('add order', async order => {
            for (const item of order) {
                let { id, name, description, price, count, user_id } = item;
                const isDone = false;
                const time_stamp = new Date();
                await dbQueries.placeOrder(id, name, description, price, count, isDone, user_id, time_stamp);
                await dbQueries.updateStockQty(id, count);
            }

            io.sockets.emit('change_data');
            io.sockets.emit('data');
        });

        // sending info about the order that it has been accepted and busy preparing.
        socket.on('accepted', async query => {
            await dbQueries.addToUserOrders(query);
            io.sockets.emit('data');
        });

        // emit that the order is ready for pick up
        socket.on('ready for collection', async (msg, id, isDone) => {
            let results = await dbQueries.updateUserOrder(id, msg, isDone);
            const order_id = results[0].id;
            let order = await dbQueries.getReadyOrder(order_id);
            io.sockets.emit('data');
        });

        // emiting all the user orders
        socket.on('get orders', async () => {
            socket.emit('data');
            socket.emit('past orders');
        });

        // saving the order after it has been finished
        socket.on('save order', async (order) => {
            await dbQueries.updateOrders(order.id);
            // setTimeout(() => {
            await dbQueries.removeOrder(order.id);
            io.sockets.emit('change_data');
            // }, 3000)
        })

        socket.on("disconnect", () => {
        });
    });
}
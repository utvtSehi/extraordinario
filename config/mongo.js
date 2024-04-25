const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://al222210096:qfihIJUZalo6kIzn@cluster0.feluvoh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión exitosa a MongoDB.');
}).catch((error) => {
    console.error('Error de conexión a MongoDB:', error);
});
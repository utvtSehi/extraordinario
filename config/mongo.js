const mongoose = require('mongoose');
//mongodb+srv://Zennith:cVPt5FkBXKt9FXA6@utvt.fuicefd.mongodb.net/?retryWrites=true&w=majority
//mongoose.connect('mongodb+srv://zenit:orNjLnazwg3mE4Yp@zennit.p35k7as.mongodb.net/Final?retryWrites=true&w=majority&appName=Final', {
mongoose.connect('mongodb://localhost:27017/Proyecto')
.then(() => {
    console.log('Conexión exitosa a MongoDB.');
})
.catch((error) => {
    console.error('Error de conexión a MongoDB:', error);
});
const mongoose=require('mongoose');

const AppointmentSchema=new mongoose.Schema({
    apptDate: {
        type: Date,
        require: true
    },
    
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    dentist: {
        type: mongoose.Schema.ObjectId,
        ref: 'Dentist',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// module.exports=mongoose.model('Appointment',AppointmentSchema);
const Booking =  mongoose.model("Appointment", AppointmentSchema)
export default Booking
const mongoose = require('mongoose');
const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true } // URL or file path
});

const Staff = mongoose.model('SupportingStaff', staffSchema);
async function seedDatabase() {
    const count = await Staff.countDocuments();
    if (count === 0) {
        await Staff.insertMany([
                { name: "Zaheer Khan", role: "Mentor", image: "/players/support_staff/zaheer_khan.png"},
                { name: "Justin Langer", role: "Head Coach", image: "/justin_langer.png"},
                { name: "Lance Klusener", role: "Assistant Coach", image: "/players/support_staff/lance_klusener.png"},
                { name: "Sridharan Sriram", role: "Assistant Coach", image: "/players/support_staff/sridharan_sriram.png"},
                { name: "Jonty Rhodes", role: "Assistant Coach", image: "/players/support_staff/jonty_rhodes.png"},
                { name: "Pravin Tambe", role: "Assistant Coach", image: "/players/support_staff/Pravin_tambe.png"},
                { name: "Adam Voges", role: "Cricket Consultant", image: "/players/support_staff/adam_voges.png"},
                
            ]);
            
        console.log("✅ Staff inserted successfully!");
    }
}

seedDatabase();

module.exports = Staff;

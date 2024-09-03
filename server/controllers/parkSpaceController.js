const Slot = require("../models/parkSpaceModel");

const addSlot = async (req, res) => {
  try {
    for (let slotNo = 1; slotNo <= 69; slotNo++) {
      await Slot.create({ slotNo });
    }
    res.status(201).json({
      Success: "Slots Added Successfully!",
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({ error: "Failed to add slots" });
  }
};


const allSlot = async (req, res) => {
  const slot = await Slot.find();
  if (slot) {
    res.status(200).json(slot);
  } else {
    res.status(400);
  }
};

const slotEntry = async (req, res) => {
  try {
    const id = req.body.slotId;

    let slot = await Slot.findOne({ slotNo: id });
    
    if (!slot) {
      slot = new Slot({
        slotNo: id,
        occupied: true,
        inTime: Date.now(),
        carOwner: req.body.carOwner, 
      });

      await slot.save();
      
      return res.status(201).json({
        Success: "Slot created and booked successfully!",
      });
    } else {
      slot.occupied = true;
      slot.inTime = Date.now();
      slot.carOwner = req.body.carOwner; 

      await slot.save(); 

      return res.status(200).json({
        Success: "Slot Entry Successful!",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      Error: "Internal Server Error",
    });
  }
};

module.exports = slotEntry;



const slotExit = async (req, res) => {
    const id = req.body.id;
    const slot = await Slot.findOne({slotNo:id});
    if (slot) {
        slot.occupied = false;
        slot.carOwner = "";
        const inTime = slot.inTime;
        const inTimeInt = parseInt(inTime);
        const totalTime = Date.now() - inTimeInt;
        console.log(totalTime);
        const minutes = Math.floor((totalTime % 3600000) / 60000);
        slot.save();
        res.status(200).json({
        Success: "Slot Exit Successful!",
        minutes: minutes,
        payableAmount: minutes * 1,
        });
    } else {
        res.status(400);
    }
    }

module.exports = {
  addSlot,
  allSlot,
  slotEntry,
  slotExit,
};

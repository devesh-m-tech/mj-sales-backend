import Service from "../models/service.model.js";
/* ===============================
   GET ALL SERVICES
   =============================== */
export const getAll = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ===============================
   ADD SERVICE
   =============================== */
export const addOne = async (req, res) => {
  try {
    const { name } = req.body;

    const service = await Service.create({
      service_name: name,
    });

    res.json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ===============================
   UPDATE SERVICE
   =============================== */
export const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await Service.findByIdAndUpdate(id, {
      service_name: name,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ===============================
   DELETE SERVICE
   =============================== */
export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// import model
const Res = require("../models/res.model.js");

// Server Test:

module,
    (exports.apiTest = (req, res) => {
        res.json({ message: "Server is working!" });
    });

// 2 export all functions with placeholder

// // Create One
// module.exports.createRes = (req, res) => {
//     Res.create(req.body)
//         .then((newRes) => res.json(newRes))
//         .catch((err) => res.status(400).json(err));
// };

// Read All
module.exports.allRes = (req, res) => {
    Res.find()
        .then((resList) => res.json(resList))
        .catch((err) => res.status(400).json(err));
};

// Read One
module.exports.oneRes = (req, res) => {
    Res.findOne({ _id: req.params.id })
        .then((oneRes) => res.json(oneRes))
        .catch((err) => res.status(400).json(err));
};

// Update One
module.exports.updateRes = (req, res) => {
    Res.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true, // Enabling validation step
    })
        .then((updatedRes) => res.json(updatedRes))
        .catch((err) => res.status(400).json(err));
};

// Delete One
module.exports.deleteRes = (req, res) => {
    Res.deleteOne({ _id: req.params.id })
        .then((status) => res.json(status))
        .catch((err) => res.status(400).json(err));
};

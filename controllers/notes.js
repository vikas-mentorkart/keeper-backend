const User = require("../models/users");

const getNotes = (req, res) => {
  const { id } = req.user;
  User.findById(id)
    .then((user) => {
      if (user)
        return res.json({
          success: true,
          message: "Notes By user id",
          notes: user.notes,
        });
      return res.json({ success: false, message: "user not found" });
    })
    .catch(() => {
      return res.json({ success: false, message: "something went wrong" });
    });
};

const addNote = (req, res) => {
  const { title, description } = req.body;
  const { id } = req.user;
  User.findById(id).then(async (user) => {
    try {
      user.notes.push({ title, description });
      await user.save();
      return await res.json({
        success: true,
        message: "Note added successfully",
      });
    } catch (err) {
      res.json({ success: false, message: err });
    }
  });
};

const updateNote = (req, res) => {
  const { id } = req.user;
  const { title, description } = req.body;
  const { noteId } = req.params;
  User.findById(id)
    .then((user) => {
      let updatedNotes = [];
      user.notes.forEach((el) => {
        if (el._id != noteId) {
          updatedNotes.push(el);
        } else {
          updatedNotes.push({ ...el, title, description });
        }
      });

      user.notes = updatedNotes;
      user
        .save()
        .then(() =>
          res.json({ success: true, message: "Note Updated Successfully" })
        )
        .catch(() =>
          res.json({ success: false, message: "Something went wrong" })
        );
    })
    .catch(() => res.json({ success: false, message: "No user found" }));
};

const deleteNote = (req, res) => {
  const { id } = req.user;
  const { noteId } = req.params;
  User.findById(id)
    .then((user) => {
      let updatedNotes = [];
      user.notes.forEach((el) => {
        if (el._id != noteId) {
          updatedNotes.push(el);
        }
      });

      user.notes = updatedNotes;
      user
        .save()
        .then(() =>
          res.json({ success: true, message: "Note deleted Successfully" })
        )
        .catch(() =>
          res.json({ success: false, message: "Something went wrong" })
        );
    })
    .catch(() => res.json({ success: false, message: "No user found" }));
};
module.exports = { addNote, getNotes, updateNote, deleteNote };

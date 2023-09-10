const router = require("express").Router();
const isLoggedIn = require("../middlewares/auth");
const {
  addNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/notes");

router.get("/get-notes", isLoggedIn, getNotes);
router.post("/add-note", isLoggedIn, addNote);
router.put("/update-note/:noteId", isLoggedIn, updateNote);
router.delete("/delete-note/:noteId", isLoggedIn, deleteNote);

module.exports = router;

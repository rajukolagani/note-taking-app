"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNote = exports.getNotes = void 0;
const Note_1 = require("../models/Note");
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield Note_1.Note.find({ userId: req.userId });
        res.status(200).json(notes);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.getNotes = getNotes;
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const newNote = new Note_1.Note({ title, content, userId: req.userId });
    try {
        yield newNote.save();
        res.status(201).json(newNote);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.createNote = createNote;
//# sourceMappingURL=noteController.js.map
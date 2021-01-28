console.log("Welcome to the main module")
import { ConvictionSelect } from "./convictions/ConvictionSelect.js"
import { CriminalList } from "./criminals/CriminalList.js"
import { OfficerSelect } from "./officers/OfficerSelect.js";
import { NoteForm } from "./notes/NoteForm.js";

CriminalList()
ConvictionSelect()
OfficerSelect()
NoteForm()
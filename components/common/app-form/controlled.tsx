import Checkbox from "./checkbox/Checkbox";
import withHocs from "./hocs";
import TextField from "./text-field/TextField";
import { ICheckbox, ITextInput } from "./type";

export const ControlledTextField = withHocs<ITextInput>(TextField);
export const ControlledCheckbox = withHocs<ICheckbox>(Checkbox);

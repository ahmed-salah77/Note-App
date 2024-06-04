export interface AddNoteAction {
  type: 'open adding form' | 'close adding form';
}
const addNoteReducer = (state: boolean, action: AddNoteAction): boolean => {
  if (action.type === "open adding form") return true;
  if (action.type === "close adding form") return false;
  return state;
};

export default addNoteReducer;
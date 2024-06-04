export interface EditNoteAction {
  type: 'open edit form' | 'close edit form';
}
const editNoteReducer = (state: boolean, action: EditNoteAction): boolean => {
  if (action.type === "open edit form") return true;
  if (action.type === "close edit form") return false;
  return state;
};

export default editNoteReducer;
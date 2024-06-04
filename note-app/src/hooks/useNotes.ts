import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Note } from "../services/noteServices";
import { CACHE_KEY_Notes, CACHE_KEY_UserNotes } from "../services/constants";
import axios from "axios";

interface AddNoteContext {
  previousNotes: Note[] | [];
}
const apiClient = new APIClient<Note>("/note/");
const useNotes = () => {
  const token = localStorage.getItem("jwt-token");
  const queryClient = useQueryClient();
  // const getAllNotes = useQuery({
  //   queryKey: ["notes"],
  //   queryFn: () =>
  //     apiClient.getAll({
  //       headers: {
  //         token: token,
  //       },
  //     }),
  // });
  const getUserNotes = useQuery({
    queryKey: CACHE_KEY_UserNotes,
    queryFn: () =>
      apiClient.getAll({
        headers: {
          token: token,
        },
      }),
  });
  const addNote = useMutation<Note, Error, Note, AddNoteContext>({
    mutationFn: (note: Note) =>
      apiClient.post(note, {
        headers: {
          token: token,
        },
      }),
    onError: (error, newNote, context) => {
      if (!context) return;
      queryClient.setQueryData<Note[]>(
        CACHE_KEY_UserNotes,
        context.previousNotes
      );
      console.log(error.message);
    },
    onMutate: (newNote: Note) => {
      const previousNotes =
        queryClient.getQueryData<Note[]>(CACHE_KEY_UserNotes) || [];
      queryClient.setQueryData<Note[]>(CACHE_KEY_UserNotes, (notes = []) => [
        newNote,
        ...notes,
      ]);
      // onAdd();
      return { previousNotes };
    },
    onSuccess: (savedNote, newNote) => {
      console.log(newNote);
      queryClient.setQueryData<Note[]>(
        CACHE_KEY_UserNotes,
        ((notes) =>
          notes?.map((note) =>
            note.createdAt == undefined ? savedNote : note
          )) || [savedNote]
      );
    },
  });
  const editNote = useMutation<Note, Error, Note, AddNoteContext>({
    mutationFn: (note: Note) =>
      axios
        .patch<Note>(
          `http://localhost:3000/note/${note._id}`,
          { title: note.title, content: note.content },
          {
            headers: {
              token: token,
            },
          }
        )
        .then((res) => res.data),
    onError: (error, newNote, context) => {
      console.log(error.message);
      if (!context) return;
      queryClient.setQueryData<Note[]>(
        CACHE_KEY_UserNotes,
        context.previousNotes
      );
      console.log(error.message);
    },
    onMutate: (newNote: Note) => {
      console.log(newNote);
      const previousNotes =
        queryClient.getQueryData<Note[]>(CACHE_KEY_UserNotes) || [];
      queryClient.setQueryData<Note[]>(CACHE_KEY_UserNotes, (notes = []) => [
        ...notes.map((note) => (note._id == newNote._id ? newNote : note)),
      ]);
      // onAdd();
      return { previousNotes };
    },
    onSuccess: (savedNote, newNote) => {
      queryClient.setQueryData<Note[]>(CACHE_KEY_UserNotes, (notes) =>
        notes?.map((note) => (note._id == undefined ? savedNote : note))
      );
    },
  });
  const deleteNote = useMutation<Note, Error, Note, AddNoteContext>({
    mutationFn: (note: Note) =>
      axios.delete(`http://localhost:3000/note/${note._id}`, {
        headers: {
          token: token,
        },
      }),
    onError: (error, newNote, context) => {
      console.log(error.message);
      if (!context) return;
      queryClient.setQueryData<Note[]>(
        CACHE_KEY_UserNotes,
        context.previousNotes
      );
      console.log(error.message);
    },
    onMutate: (newNote: Note) => {
      const previousNotes =
        queryClient.getQueryData<Note[]>(CACHE_KEY_UserNotes) || [];
      queryClient.setQueryData<Note[]>(CACHE_KEY_UserNotes, (notes = []) => [
        ...notes.filter((note) => note._id != newNote._id),
      ]);
      // onAdd();
      return { previousNotes };
    },
    onSuccess: (savedNote, newNote) => {
      queryClient.setQueryData<Note[]>(CACHE_KEY_UserNotes, (notes) =>
        notes?.map((note) => (note == newNote ? savedNote : note))
      );
    },
  });
  return { getUserNotes, addNote, editNote, deleteNote };
};
export default useNotes;

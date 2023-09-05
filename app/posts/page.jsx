'use client'
import io from 'Socket.IO-client'

let socket

import {useState, useCallback, useEffect} from "react";
import {createEditor, BaseEditor, Descendant, Editor, Element, Transforms} from 'slate'
import {Slate, Editable, withReact, ReactEditor} from 'slate-react'

import ToolsBar from "../../components/Editor/ToolsBar";
import EditorInput from "../../components/EditorInput";
import {useAsync} from "react-use";

const initialValue = [
    {
        type: 'paragraph',
        children: [{text: 'string'}]  // Fix typo: "childern" should be "children"
    }
];

const NewPostPage = () => {
    const [editor] = useState(() => withReact(createEditor()))
    const [value, setValue] = useState(initialValue)
    const [isServerUpdate, setIsServerUpdate] = useState(false);


    useAsync(async () => {
        await fetch('api/socket');

        socket = io()

        socket.on('connect', () => {
            console.log('connected');
        });

        socket.on('start', content => {
            if (content) {
                setValue(content)
            }
        });

        socket.on('content-input', content => {
            setIsServerUpdate(true);
            setValue(content);
        });


        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (editor.children.length > 0) {
            Transforms.delete(editor, {
                at: {
                    anchor: Editor.start(editor, []),
                    focus: Editor.end(editor, []),
                },
            });


            Transforms.removeNodes(editor, {
                at: [0],
            });


            Transforms.insertNodes(editor, value);
        }
    }, [value, editor]);


    const onChangeHandler = (e) => {
        if (isServerUpdate) {
            setIsServerUpdate(false);
            return;
        }

        const isAsChange = editor.operations.some(
            op => op.type !== 'set_selection'
        );

        if (isAsChange && socket) {
            socket.emit('content-change', e);
        }
    }


    return (
        <div className="flex flex-col w-4/5 md:w-11/12 lg:w-1/3 mx-auto ">
            <h1 className="font-semibold mt-9 text-3xl md:text-4xl mb-5">New Post</h1>

            <Slate editor={editor} initialValue={value} onChange={onChangeHandler}>

                <ToolsBar editor={editor}/>

                <EditorInput editor={editor}/>

            </Slate>

        </div>
    )
}
export default NewPostPage
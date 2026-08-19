import { useState } from "react";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import { UseMarkdown } from "../context/UseMarkdown";
import ReactModal from "react-modal";

export function Writeblog() {
  const { markdown, setMarkdown } = UseMarkdown();

  const [isModal, setIsModal] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");

  function openModal() {
    setIsModal(true);
  }

  async function postblog() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog/postblog`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            title: blogTitle,
            content: markdown,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      if (res.ok) {
        setIsModal(false);
        setBlogTitle("");
        setMarkdown("");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0f0e] text-white">

      {/* TOP BAR */}

      <div className="
        h-16
        border-b
        border-[#1c2925]
        bg-[#0b0f0e]
        flex
        items-center
        justify-between
        px-6
      ">

        <div>

          <p className="text-xs uppercase tracking-[0.2em] text-emerald-500">
            Writing
          </p>

          <h1 className="text-lg font-semibold">
            Create a post
          </h1>

        </div>


        <div className="flex items-center gap-3">

          <button
            onClick={() => {
              setMarkdown("");
              setBlogTitle("");
            }}
            className="
              px-4
              py-2
              rounded-lg
              text-sm
              text-slate-400
              hover:text-white
              hover:bg-[#151d1a]
              transition
            "
          >
            Clear
          </button>


          <button
            onClick={openModal}
            disabled={!markdown.trim()}
            className="
              px-5
              py-2
              rounded-lg
              bg-emerald-500
              hover:bg-emerald-400
              disabled:bg-slate-800
              disabled:text-slate-600
              text-[#07100d]
              disabled:cursor-not-allowed
              font-semibold
              text-sm
              transition
            "
          >
            Publish
          </button>

        </div>

      </div>


      {/* EDITOR */}

      <div className="max-w-7xl mx-auto px-5 py-6">

        <div
          className="
            h-[calc(100vh-120px)]
            min-h-[500px]
            bg-[#111816]
            border
            border-[#1c2925]
            rounded-2xl
            overflow-hidden
            shadow-2xl
          "
        >

          {/* EDITOR HEADER */}

          <div
            className="
              h-12
              border-b
              border-[#1c2925]
              flex
              items-center
              justify-between
              px-5
              bg-[#0f1513]
            "
          >

            <div className="flex items-center gap-2">

              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="w-2 h-2 rounded-full bg-emerald-400" />

            </div>

            <p className="text-xs text-slate-600">
              Markdown editor
            </p>

          </div>


          {/* EDITOR + PREVIEW */}

          <div className="flex h-[calc(100%-48px)]">

            {/* LEFT */}

            <div
              className="
                w-1/2
                border-r
                border-[#1c2925]
                overflow-hidden
              "
            >
              <Editor />
            </div>


            {/* RIGHT */}

            <div className="w-1/2 overflow-hidden">

              <div className="
                h-full
                bg-[#0d1311]
              ">
                <Preview />
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* PUBLISH MODAL */}

      <ReactModal
        isOpen={isModal}
        onRequestClose={() => setIsModal(false)}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          },

          content: {
            position: "relative",
            inset: "auto",
            width: "min(450px, 90%)",
            background: "#111816",
            color: "white",
            border: "1px solid #293a33",
            borderRadius: "20px",
            padding: "30px",
          },
        }}
      >

        <div>

          <p className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-emerald-500
          ">
            Publish
          </p>

          <h2 className="text-2xl font-semibold mt-2">
            Give your post a title
          </h2>

          <p className="text-slate-500 text-sm mt-2">
            Choose a title that tells readers what your post is about.
          </p>


          {/* TITLE */}

          <input
            type="text"
            placeholder="Enter title..."
            value={blogTitle}
            autoFocus
            onChange={(e) => setBlogTitle(e.target.value)}
            className="
              w-full
              mt-6
              px-4
              py-3
              rounded-xl
              bg-[#0b0f0e]
              border
              border-[#293a33]
              text-white
              placeholder:text-slate-600
              outline-none
              focus:border-emerald-500
              transition
            "
          />


          {/* BUTTONS */}

          <div className="flex justify-end gap-3 mt-7">

            <button
              onClick={() => {
                setIsModal(false);
              }}
              className="
                px-5
                py-2.5
                rounded-xl
                border
                border-[#29352f]
                text-slate-400
                hover:text-white
                hover:bg-[#18221f]
                transition
              "
            >
              Cancel
            </button>


            <button
              disabled={!blogTitle.trim()}
              onClick={postblog}
              className="
                px-5
                py-2.5
                rounded-xl
                bg-emerald-500
                hover:bg-emerald-400
                disabled:bg-slate-800
                disabled:text-slate-600
                text-[#07100d]
                font-semibold
                transition
              "
            >
              Publish post
            </button>

          </div>

        </div>

      </ReactModal>

    </div>
  );
}
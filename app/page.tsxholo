"use client";
import React, { useState, useEffect } from "react";

type Tag = "Save" | "Vulnerable" | "Critical" | "Info";

interface MediaItem {
  url: string;
  type: string;
}

interface TimelineStoneData {
  text: string;
  color: string;
  tags: Tag[];
  media: MediaItem[];
}

const DEFAULT_COLOR = "#44ffff";

const TAG_OPTIONS: Tag[] = ["Save", "Vulnerable", "Critical", "Info"];

export default function HoloTimeline() {
  // Initialize 100 timeline stones, try loading from localStorage first
  const [timeline, setTimeline] = useState<TimelineStoneData[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("holoTimeline");
      if (saved) return JSON.parse(saved);
    } catch {}
    return Array(100).fill(null).map(() => ({
      text: "",
      color: DEFAULT_COLOR,
      tags: [],
      media: [],
    }));
  });

  // For edit mode, track which index is currently editing
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // For controlled editing text and color etc.
  const [editText, setEditText] = useState("");
  const [editColor, setEditColor] = useState(DEFAULT_COLOR);
  const [editTags, setEditTags] = useState<Tag[]>([]);
  const [editMedia, setEditMedia] = useState<MediaItem[]>([]);

  // When clicking edit, load data into local editing states
  function startEditing(index: number) {
    setEditingIndex(index);
    const d = timeline[index];
    setEditText(d.text);
    setEditColor(d.color);
    setEditTags(d.tags);
    setEditMedia(d.media);
  }

  // Save edits back to timeline and localStorage
  function saveEditing() {
    if (editingIndex === null) return;
    const newTimeline = [...timeline];
    newTimeline[editingIndex] = {
      text: editText,
      color: editColor,
      tags: editTags,
      media: editMedia,
    };
    setTimeline(newTimeline);
    localStorage.setItem("holoTimeline", JSON.stringify(newTimeline));
    setEditingIndex(null);
  }

  // Tag toggling
  function toggleTag(tag: Tag) {
    if (editTags.includes(tag)) {
      setEditTags(editTags.filter((t) => t !== tag));
    } else {
      setEditTags([...editTags, tag]);
    }
  }

  // Handle media upload (images/videos only for preview)
  function handleMediaUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newMedia: MediaItem[] = files.map((file) => {
      return {
        url: URL.createObjectURL(file),
        type: file.type,
      };
    });
    setEditMedia([...editMedia, ...newMedia]);
  }

  // Remove a media item by index
  function removeMedia(index: number) {
    const newMedia = [...editMedia];
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(newMedia[index].url);
    newMedia.splice(index, 1);
    setEditMedia(newMedia);
  }

  // Fake record button toggle
  const [recording, setRecording] = useState(false);
  function toggleRecording() {
    alert("Record function placeholder - integrate with MediaRecorder API.");
    setRecording(!recording);
  }

  // Shiny holo panel style, stars background
  return (
    <>
      <div className="universe">
        <h1 className="title">✨ Futuristic Holo Timeline ✨</h1>

        <div className="timeline-container">
          {timeline.map((stone, i) => (
            <div
              key={i}
              className="timeline-stone"
              style={{
                borderColor: stone.color,
                boxShadow: `0 0 20px 2px ${stone.color}`,
              }}
            >
              <div className="text-area">
                {editingIndex === i ? (
                  <textarea
                    rows={3}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="Enter timeline text..."
                    className="text-input"
                  />
                ) : stone.text ? (
                  <p>{stone.text}</p>
                ) : (
                  <p className="empty-text">Empty</p>
                )}
              </div>

              <div className="tags-area">
                {stone.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag"
                    style={{ backgroundColor: stone.color }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {editingIndex === i && (
                <>
                  <div className="controls-row">
                    <label>
                      Change Color:{" "}
                      <input
                        type="color"
                        value={editColor}
                        onChange={(e) => setEditColor(e.target.value)}
                        className="color-picker"
                      />
                    </label>

                    <div className="tags-picker">
                      Add Tag:
                      {TAG_OPTIONS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={
                            editTags.includes(tag)
                              ? "tag-btn active"
                              : "tag-btn"
                          }
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="media-row">
                    <button
                      type="button"
                      onClick={toggleRecording}
                      className={recording ? "recording" : ""}
                      title="Record (placeholder)"
                    >
                      🎤 Record
                    </button>

                    <label className="upload-label" title="Upload media files">
                      📁 Upload
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*,audio/*"
                        onChange={handleMediaUpload}
                        style={{ display: "none" }}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={saveEditing}
                      className="save-btn"
                    >
                      💾 Save
                    </button>
                  </div>

                  <div className="media-previews">
                    {editMedia.map((m, mi) => (
                      <div key={mi} className="media-item">
                        {m.type.startsWith("image") && (
                          <img src={m.url} alt="upload" />
                        )}
                        {m.type.startsWith("video") && (
                          <video src={m.url} controls />
                        )}
                        {m.type.startsWith("audio") && (
                          <audio src={m.url} controls />
                        )}
                        <button
                          type="button"
                          className="remove-media"
                          onClick={() => removeMedia(mi)}
                          title="Remove media"
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {editingIndex !== i && (
                <button
                  type="button"
                  onClick={() => startEditing(i)}
                  className="edit-btn"
                >
                  ✎ Edit
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Universe starfield background */
        .universe {
          min-height: 100vh;
          background: radial-gradient(
              ellipse at center,
              #000014 0%,
              #000010 70%,
              #000007 100%
            ),
            url("https://cdn.pixabay.com/photo/2017/08/30/12/45/space-2695569_1280.jpg")
              no-repeat center center fixed;
          background-size: cover;
          overflow-x: auto;
          padding: 2rem;
          color: #00ffffcc;
          font-family: "Orbitron", sans-serif;
          user-select: none;
          position: relative;
        }

        /* Title with glow */
        .title {
          font-size: 3rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 1.5rem;
          color: #00fff7;
          text-shadow:
            0 0 8px #00fff7,
            0 0 15px #00fff7,
            0 0 20px #00ffffbb;
        }

        /* Timeline container horizontal scroll */
        .timeline-container {
          display: flex;
          gap: 1.2rem;
          overflow-x: scroll;
          padding-bottom: 1rem;
          scroll-behavior: smooth;
        }

        .timeline-container::-webkit-scrollbar {
          height: 8px;
        }
        .timeline-container::-webkit-scrollbar-thumb {
          background: #00ffff88;
          border-radius: 10px;
        }
        .timeline-container::-webkit-scrollbar-track {
          background: #00000011;
        }

        /* Each timeline stone - holographic glass panel */
        .timeline-stone {
          flex: 0 0 250px;
          background: linear-gradient(
            135deg,
            rgba(0, 255, 255, 0.12),
            rgba(255, 255, 255, 0.08)
          );
          border: 2px solid #44ffff;
          border-radius: 20px;
          padding: 1rem;
          box-shadow:
            0 0 20px 3px rgba(0, 255, 255, 0.7),
            inset 0 0 30px 10px rgba(0, 255, 255, 0.2);
          backdrop-filter: blur(15px);
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 350px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .timeline-stone:hover {
          box-shadow:
            0 0 40px 5px rgba(0, 255, 255, 0.9),
            inset 0 0 50px 15px rgba(0, 255, 255, 0.4);
          border-color: #00ffffcc;
          cursor: pointer;
        }

        .text-area {
          flex-grow: 1;
          margin-bottom: 0.8rem;
          color: #ccffffdd;
          font-size: 1rem;
          line-height: 1.3;
          overflow-y: auto;
          max-height: 140px;
        }

        .text-input {
          width: 100%;
          resize: vertical;
          border: none;
          background: rgba(0, 255, 255, 0.1);
          color: #00ffffdd;
          font-family: "Orbitron", monospace, monospace;
          font-size: 1rem;
          border-radius: 10px;
          padding: 0.6rem;
          outline: none;
          box-shadow:
            0 0 6px 1px #00ffffaa;
        }

        .empty-text {
          color: #004444aa;
          font-style: italic;
        }

        .tags-area {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-bottom: 0.4rem;
        }

        .tag {
          background-color: #44ffffaa;
          color: #003333;
          padding: 0.25rem 0.6rem;
          font-size: 0.8rem;
          border-radius: 12px;
          font-weight: 600;
          text-shadow: 0 0 3px #00ffffbb;
          user-select: none;
        }

        .edit-btn {
          background: transparent;
          border: 2px solid #00ffffaa;
          padding: 0.4rem 0.7rem;
          border-radius: 12px;
          color: #00ffffcc;
          font-weight: 700;
          font-size: 1rem;
          transition: background-color 0.25s ease;
          user-select: none;
        }
        .edit-btn:hover {
          background-color: #00ffff22;
          cursor: pointer;
        }

        .controls-row {
          margin-top: 0.6rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          font-size: 0.9rem;
          color: #00eeee;
          user-select: none;
        }

        label {
          user-select: none;
        }

        .color-picker {
          margin-left: 0.4rem;
          cursor: pointer;
          border-radius: 6px;
          border: none;
          width: 36px;
          height: 24px;
          vertical-align: middle;
          background: none;
          padding: 0;
        }

        .tags-picker {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 0.3rem;
        }

        .tag-btn {
          border: 1.5px solid #00cccccc;
          background: transparent;
          color: #00cccccc;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          user-select: none;
        }
        .tag-btn.active {
          background-color: #00ccccdd;
          color: #001111;
          box-shadow: 0 0 8px #00ccccdd;
        }
        .tag-btn:hover {
          background-color: #00cccc55;
          color: #00ffff;
        }

        .media-row {
          margin-top: 0.8rem;
          display: flex;
          gap: 0.7rem;
          align-items: center;
          user-select: none;
        }

        .media-row button,
        .media-row label {
          background: transparent;
          border: 1.8px solid #00cccccc;
          border-radius: 14px;
          color: #00cccccc;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          font-size: 0.95rem;
          cursor: pointer;
          user-select: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .media-row button:hover,
        .media-row label:hover {
          background-color: #00cccc55;
          color: #00ffff;
        }
        .media-row .recording {
          background-color: #cc0000cc;
          color: #fff;
          border-color: #ff4444;
          box-shadow: 0 0 12px #ff4444;
        }

        .media-previews {
          margin-top: 0.7rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          max-height: 140px;
          overflow-x: auto;
          user-select: none;
        }

        .media-item {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 12px #00ffffaa inset;
          border: 1.5px solid #00cccccc;
          background: rgba(0, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .media-item img,
        .media-item video,
        .media-item audio {
          max-width: 100%;
          max-height: 100%;
          border-radius: 12px;
        }

        .remove-media {
          position: absolute;
          top: 2px;
          right: 2px;
          background: #cc000088;
          border: none;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 14px;
          line-height: 18px;
          cursor: pointer;
          font-weight: 900;
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .remove-media:hover {
          background: #ff0000cc;
        }

        /* Scrollbar for media previews */
        .media-previews::-webkit-scrollbar {
          height: 6px;
        }
        .media-previews::-webkit-scrollbar-thumb {
          background: #00cccc88;
          border-radius: 10px;
        }
        .media-previews::-webkit-scrollbar-track {
          background: #00000011;
        }
      `}</style>
    </>
  );
}
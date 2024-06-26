import CMS from "netlify-cms-app"

CMS.registerEditorComponent({
  // Internal id of the component
  id: "video",
  // Visible label
  label: "Video",
  // Fields the user need to fill out when adding an instance of the component
  fields: [{ name: "url", label: "Video URL", widget: "string" }],
  // Pattern to identify a block as being an instance of this component
  pattern: /^`video:\s(.*)`$/,
  // Function to extract data elements from the regexp match
  fromBlock: function (match) {
    return {
      url: match[1],
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function (obj) {
    return "`video: " + obj.url + "`"
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function (obj) {
    return obj.url
  },
})

// See https://github.com/netlify/netlify-cms/issues/5092#issuecomment-1256321540
const css =
  "[data-slate-editor] { -webkit-user-modify: read-write !important; }"
const style = document.createElement("style")
document.head.appendChild(style)
style.appendChild(document.createTextNode(css))

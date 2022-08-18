import { modalLoad } from "./modal.tmpl";
import { render } from "../../utils/render";

window.addEventListener('DOMContentLoaded', () => {
  const loadedData = {
    title: 'File loaded',
    temporaryLabel: 'filename.png'
  }

  const loadData = {
    title: 'Load file',
    temporaryLabel: 'Choose file on your computer' 
  }

  const errorData = {
    title: 'Error (try again)',
    temporaryLabel: loadData.temporaryLabel
  }

  render('#btn-load', modalLoad, loadData)
  render('#btn-loaded', modalLoad, loadedData)
  render('#btn-load-error', modalLoad, errorData)
})
export default {
  fetchLabels() {
    return fetch(`data/labels.json`).then(res => res.json()).catch(e => console.log(e))
  }
}
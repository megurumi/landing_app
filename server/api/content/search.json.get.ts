import { serverQueryContent } from '#content/server'

// Search whitin /Content query matching markdown type
export default eventHandler(async (event) => {
  return serverQueryContent(event).where({ _type: "markdown" }).find()
})

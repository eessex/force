const { stringifyJSONForWeb } = require('desktop/components/util/json.coffee')

export const AuthorsQuery = (ids) => {
  return `
    {
      authors(ids: ${stringifyJSONForWeb(ids)}) {
        name
        bio
        image_url
        twitter_handle
      }
    }
  `
}

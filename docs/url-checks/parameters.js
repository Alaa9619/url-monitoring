export const tagsParameter = {
  in: 'query',
  name: 'tags',
  schema: {
    type: 'array',
    items: {
      type: 'string'
    }
  },
  description: 'tags related to the url checks'
}

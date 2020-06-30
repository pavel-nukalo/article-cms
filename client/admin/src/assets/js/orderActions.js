export const orderUp = function (item) {
  const i = this.children.findIndex(c => c.name == item.name && c.parent == item.parent);
  const prev = this.children[i - 1];
  
  this.$store.dispatch('UPDATE_DOCUMENT', {
    collection: 'articles',
    query: { 
      name: item.name,
      parent: item.parent
    },
    doc: { order: prev.order }
  })
    .then(() => {
      return this.$store.dispatch('UPDATE_DOCUMENT', {
        collection: 'articles',
        query: { 
          name: prev.name,
          parent: prev.parent
        },
        doc: { order: item.order }
      });
    })
    .then(() => this.fetchData());
};

export const orderDown = function (item) {
  const i = this.children.findIndex(c => c.name == item.name && c.parent == item.parent);
  const next = this.children[i + 1];
  
  this.$store.dispatch('UPDATE_DOCUMENT', {
    collection: 'articles',
    query: { 
      name: item.name,
      parent: item.parent
    },
    doc: { order: next.order }
  })
    .then(() => {          
      return this.$store.dispatch('UPDATE_DOCUMENT', {
        collection: 'articles',
        query: { 
          name: next.name,
          parent: next.parent
        },
        doc: { order: item.order }
      });
    })
    .then(() => this.fetchData());
};
let people = {
  'bpopa': {id:'bpopa', name: 'Bogdan Popa'},
  'lpopa': {id:'lpopa', name: 'Lucian Popa'},
  'dghera': {id:'dghera', name: 'Dorin Ghera'},
  'aghera': {id:'aghera', name: 'Ana Ghera'},
}

let institutions = {
  state: {
    'pbuc': {id:'pbuc', name:'Primaria Bucuresti'},
  },
  companies: {
    'expert': {id:'expert', name:'Expert Com SRL'},
  }
}

let relations = {
  personToPerson: [
    {id:0, source:'dghera', target: 'lpopa', type:'nas'},
    {id:1, source:'bpopa', target: 'lpopa', type:'tata'},
    {id:2, source:'aghera', target: 'dghera', type:'sora'},
  ],
  personToInstitution: [
    {id:3, source:'aghera', target: 'expert', type:'actionar'},
    {id:4, source:'bpopa', target: 'pbuc', type:'consilier'},
  ]
}

export {people, institutions, relations}

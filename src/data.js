let entities = {
  'bpopa': {id:'bpopa', name: 'Bogdan Popa', type:'person'},
  'lpopa': {id:'lpopa', name: 'Lucian Popa', type:'person'},
  'dghera': {id:'dghera', name: 'Dorin Ghera', type:'person'},
  'aghera': {id:'aghera', name: 'Ana Ghera', type:'person'},
  'pbuc': {id:'pbuc', name:'Primaria Bucuresti', type:'state'},
  'expert': {id:'expert', name:'Expert Com SRL', type:'company'},
}

let relations = [
  {id:0, source:'dghera', target: 'lpopa', type:'godparent', name:'nas'},
  {id:1, source:'bpopa', target: 'lpopa', type:'family', name:'tata'},
  {id:2, source:'aghera', target: 'dghera', type:'family', name:'sora'},
  {id:3, source:'aghera', target: 'expert', type:'business', name:'actionar'},
  {id:4, source:'bpopa', target: 'pbuc', type:'employee', name:'consilier'},
]

export {entities, relations}

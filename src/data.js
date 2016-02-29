let entities = {
  'bpopa': {id:'bpopa', name: 'Bogdan Popa', type:'person'},
  'lpopa': {id:'lpopa', name: 'Lucian Popa', type:'person'},
  'dghera': {id:'dghera', name: 'Dorin Ghera', type:'person'},
  'aghera': {id:'aghera', name: 'Ana Ghera', type:'person'},
  'pbuc': {id:'pbuc', name:'Primaria Bucuresti', type:'state'},
  'expert': {id:'expert', name:'Expert Com SRL', type:'company'},
}

let relations = [
  {id:0, source:'dghera', target: 'lpopa', type:'nas'},
  {id:1, source:'bpopa', target: 'lpopa', type:'tata'},
  {id:2, source:'aghera', target: 'dghera', type:'sora'},
  {id:3, source:'aghera', target: 'expert', type:'actionar'},
  {id:4, source:'bpopa', target: 'pbuc', type:'consilier'},
]

export {entities, relations}

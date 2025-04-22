type Entity = {
    entity_group?: string;
    word: string;
    score: number;
    start: number;
    end: number;
    entity: string;
  };
  
  export function groupEntities(entities: Entity[]): Entity[] {
    const grouped: Entity[] = [];
    let currentGroup: Entity | null = null;
  
    for (const entity of entities) {
      if (entity.entity.startsWith('B-') || !currentGroup) {
        currentGroup = { ...entity, word: entity.word };
        grouped.push(currentGroup);
      } else if (entity.entity.startsWith('I-') && currentGroup) {
        currentGroup.word += entity.word.replace(/^##/, '');
        currentGroup.end = entity.end;
        currentGroup.score = (currentGroup.score + entity.score) / 2;
      } else {
        currentGroup = null;
      }
    }
  
    return grouped;
  }
  
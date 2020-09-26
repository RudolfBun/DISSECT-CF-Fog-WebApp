export class Application {
  id: string;
  tasksize: number;
  freq: number;
  instance: string;
  numOfInstruction: number;
  threshold: number;
  strategy: string;
  canJoin: boolean;
  isConfigured: boolean;
}

export class ApplicationsObject {
  [id: string]: Application;
}

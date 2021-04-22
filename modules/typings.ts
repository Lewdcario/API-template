type Payload = {
  message: string;
  src: string;
  type: 'message' | 'audio' | string;
  choices?: { name: 'string' }[];
};

type Trace = {
  type: string;
  payload?: Payload;
};

interface ChoiceTrace extends Trace {
  type: 'choice';
}

type Event = {
  name: 'string';
};

type Path = {
  event: Event;
};

interface SpeakTrace extends Trace {
  type: 'speak';
}

interface VisualTrace extends Trace {
  type: 'visual';
}

interface CustomTrace extends Trace {
  paths: Path[];
  defaultPath: number;
}

type Command = {
  type: 'push' | 'jump';
  event: any;
};

type Stack = {
  programID: string;
  nodeID: string | null;
  variables: any;
  storage: any;
  commands: Command[];
};

type State = {
  stack: Stack[];
  storage: any;
  variables: any;
};

type Request = {
  type: string;
};

interface TextRequest extends Request {
  type: 'text';
  payload: 'string';
}

interface LaunchRequest extends Request {
  type: 'launch';
}

type Intent = {
  name: 'string';
};

type Entity = {
  name: 'string';
  value: 'string';
  query: 'string';
};

type IntentPayload = {
  intent: { name: 'string' };
  query: 'string';
  entities: Entity[];
  confidence: number;
};

interface IntentRequest extends Request {
  type: 'intent';
  payload: IntentPayload;
}

type Response = {
  trace: Trace[];
  state: State;
  request: Request;
};

type TimeoutCache = {
  [key: string]: ReturnType<typeof setTimeout>;
};

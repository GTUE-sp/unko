import * as Vuex from 'vuex'

declare module 'vuex/types' {
    export interface Dispatch {
        <P extends Payload>(payloadWithType: P, options?: DispatchOptions): Promise<any>;
      }
}
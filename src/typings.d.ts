declare global {
    namespace NodeJS {
      interface Process {
        type: string;
      }
      interface ProcessVersions {
          electron: any;
      }
    }
}
export {}
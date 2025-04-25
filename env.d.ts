// typeScript 환경 변수 타입 추가
namespace NodeJS {
    interface ProcessEnv {
        DB_HOST: string;
        DB_USER: string;
        DB_PASSWORD: string;
        DB_NAME: string;
    }
}
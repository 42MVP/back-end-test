import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleAsyncOptions = {
	useFactory: async (): Promise<TypeOrmModuleOptions> => {
		return {
			type: "postgres",
			host: process.env.POSTGRES_HOST,
			port: +process.env.POSTGRES_PORT,
			database: process.env.POSTGRES_DB,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			entities: [__dirname + '/../**/*.entity.{js,ts}'], //엔티티를 이용해서 DB 테이블을 생성(엔티티 파일이 어디있는지 정해줌)
			synchronize: true,
			logging: true
		};
	},
}

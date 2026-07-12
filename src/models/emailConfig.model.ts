
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
} from 'sequelize-typescript';


@Table({
  tableName: 'emailConfigs',
  timestamps: true,
})

export class EmailConfig extends Model<EmailConfig> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare host: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare port: number;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare secure: boolean;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare username: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare fromEmail: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  declare replyTo: string | null;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  declare provider: string | null;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare companyId: number;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare isActive: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  declare createdBy: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare updatedBy: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}


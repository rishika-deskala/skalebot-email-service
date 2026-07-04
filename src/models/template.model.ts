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
  tableName: 'emailTemplates',
  timestamps: true,
})
export class EmailTemplate extends Model<EmailTemplate> {
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
  declare subject: string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT('long'),
  })
  declare body: string;

  @AllowNull(true)
  @Column({
    type: DataType.JSON,
  })
  declare variables: object;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare companyId: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare emailConfigId: number;

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

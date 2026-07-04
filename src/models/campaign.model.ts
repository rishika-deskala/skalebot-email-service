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
  tableName: 'campaigns',
  timestamps: true,
})
export class Campaign extends Model<Campaign> {
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
  declare status: string;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare isActive: boolean;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare templateId: number;

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

  @AllowNull(false)
  @Column({
    type: DataType.JSON,
  })
  declare customerIds: number[];

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

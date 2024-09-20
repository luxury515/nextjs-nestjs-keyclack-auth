import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tcus_bltn_m')
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  bltn_no: string;

  @Column()
  bltn_cls_cd: string;

  @Column()
  titl: string;

  @Column()
  contt: string;

  @Column()
  tag: string;

  @Column()
  inpt_dtm: Date;

  @Column()
  thumbnail_img_url: string;
}
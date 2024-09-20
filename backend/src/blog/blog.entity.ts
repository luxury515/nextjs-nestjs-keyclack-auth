import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('tcus_bltn_m')
export class Blog {
  @PrimaryColumn()
  bltn_no: string;

  @Column()
  corp_cd: string;

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
  inpt_usr_id: string;

  @Column()
  updt_usr_id: string;

  @Column()
  updt_dtm: Date;

  @Column()
  thumbnail_img_url: string;
}
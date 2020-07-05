import { Types } from 'mongoose';
import { prop, arrayProp, plugin, pre, defaultClasses } from '@typegoose/typegoose';
import { IsString, MaxLength, IsAlphanumeric, IsNotEmpty, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';
import { Extend } from '@app/models/extend.model';


export class Category extends defaultClasses.Base {
    @IsNotEmpty({ message: '分类名称？' })
    @IsString({ message: '字符串？' })
    @prop({ required: true, validate: /\S+/ })
    name: string;

    @IsNotEmpty({ message: '分类别名？' })
    @IsNotEmpty({ message: '分类别名？' })
    @IsAlphanumeric('en-US', { message: 'slug 只允许字母和数字' })
    @MaxLength(30)
    @prop({ required: true, validate: /\S+/ })
    slug: string;

    @IsString({ message: '字符串？' })
    @prop()
    description: string;

    @prop({ ref: Category, default: null })
    pid: Types.ObjectId;

    @prop({ default: Date.now })
    create_at?: Date;

    @prop({ default: Date.now })
    update_at?: Date;

    @IsArray()
    @ArrayUnique()
    @arrayProp({ items: Extend })
    extends: Extend[];

    count?: number;
}



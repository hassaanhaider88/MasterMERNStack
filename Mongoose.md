# MongooseJs

### From Basic to Advanced

Mongoose  
|-- Core Concepts & Connection  
|-- Schemas & Models  
|-- Document Instance Methods & Properties  
|-- Schema Types & Options  
|-- Middleware (Hooks)  
|-- Queries & Query Helpers  
|-- Plugins & Advanced Schema Features  
|-- Population & References  
|-- Validation & Error Handling  
|-- Modern Practices & 2025–2026 Updates

### 1. Core Concepts & Connection

```
|-- const mongoose = require('mongoose')
    |-- or import mongoose from 'mongoose'   (ESM recommended)

|-- mongoose.connect(uri, options?)
    |-- uri: 'mongodb://localhost:27017/mydb' or Atlas / srv URI
    |-- options (common 2026):
        maxPoolSize: 20
        minPoolSize: 5
        serverSelectionTimeoutMS: 5000
        retryWrites: true
        w: 'majority'
        family: 4 | 6
        authSource: 'admin'

|-- mongoose.connection
    |-- .on('connected') .on('error') .on('disconnected')
    |-- .readyState (0=disconnected, 1=connected, 2=connecting, 3=disconnecting)

|-- mongoose.disconnect()
|-- mongoose.set('strictQuery', true/false/'throw')   → controls query filter strictness
```

### 2. Schemas & Models

```
|-- const schema = new mongoose.Schema(definition, options?)
    |-- definition: { field: Type | { type: Type, ...options } }
    |-- options: { timestamps: true, versionKey: false, strict: true/'throw', collection: 'customName', ... }

|-- const Model = mongoose.model('ModelName', schema, collectionName?)
    |-- Model.create(doc) / .insertMany([...])
    |-- Model.find() / findOne() / findById()
    |-- Model.updateOne() / updateMany() / findOneAndUpdate()
    |-- Model.deleteOne() / deleteMany() / findOneAndDelete()

|-- Schema methods
    schema.method('instanceMethod', function() { ... })
    schema.static('staticMethod', function() { ... })
    schema.query.queryHelper = function() { return this.find(...) }

|-- Discriminators (single collection, multiple models)
    const ChildSchema = schema.discriminator('ChildType', childDiscriminatorSchema)
```

### 3. Schema Types & Options (most common)

```
|-- Types
    String, Number, Boolean, Date, Buffer, ObjectId, Mixed (any), Array, Map, Decimal128, BigInt

|-- Common field options
    type: ...
    required: true / [true, 'Custom message']
    default: value | () => value
    unique: true
    index: true / { unique: true, sparse: true }
    min / max / enum / match / maxlength / minlength
    lowercase / uppercase / trim / set / get (transformers)
    ref: 'OtherModel'   → for population
    refPath: 'dynamicRefField'
    validate: [validatorFn, 'message'] / custom validator

|-- Timestamps option
    timestamps: true → auto createdAt & updatedAt (Date)

|-- toJSON / toObject options
    { virtuals: true, transform: (doc, ret) => { delete ret.__v; return ret; } }
```

### 4. Middleware (Hooks)

```
|-- Pre / Post hooks
    schema.pre('save', function(next) { ... })     // document middleware
    schema.pre('find', function() { ... })         // query middleware
    schema.post('save', function(doc) { ... })

|-- Hook types: init, validate, save, remove, countDocuments, find, findOne, findOneAndDelete, updateOne, etc.

|-- Async hooks: async function(next) { await ...; next() }
|-- Error in pre hook: next(new Error('...')) or throw

|-- this in middleware: document (save/remove) or query (find/update)
```

### 5. Document Instance Methods & Properties

```
|-- doc.save() / doc.validate() / doc.remove() / doc.deleteOne()
|-- doc.isModified(path?) / doc.isNew / doc.wasNew
|-- doc.id / doc._id
|-- doc.toJSON() / toObject() / toString()
|-- Virtuals: schema.virtual('fullName').get(function() { return this.first + ' ' + this.last })
```

### 6. Queries & Query Helpers

```
|-- Model.find(filter).exec() / .lean() / .cursor()
|-- .sort() .limit() .skip() .select() .populate()
|-- .where() .gt() .lt() .in() .nin() .or() .and() .nor()
|-- .countDocuments() .estimatedDocumentCount()
|-- .findOneAndUpdate(filter, update, { new: true, runValidators: true })
|-- .findByIdAndUpdate(id, update, options)
|-- Query chaining: await Model.find({ age: { $gt: 18 } }).sort('-age').limit(10)
```

### 7. Population & References

```
|-- ref: 'ModelName' in schema → stores ObjectId
|-- .populate('field') / .populate({ path: 'author', select: 'name email' })
|-- Deep population: .populate({ path: 'comments', populate: { path: 'author' } })
|-- Virtual population (no ref storage)
    schema.virtual('reviews', {
      ref: 'Review',
      localField: '_id',
      foreignField: 'product'
    })
```

### 8. Plugins & Advanced Schema Features

```
|-- schema.plugin(myPluginFn, options?)
    → e.g. mongoose-unique-validator, mongoose-paginate-v2, mongoose-delete (soft delete)

|-- Built-in plugins / common community
    mongoose-timestamp
    mongoose-autopopulate
    mongoose-aggregate-paginate-v2

|-- Custom types / casting
|-- Subdocuments / arrays of subdocs
```

### 9. Validation & Error Handling

```
|-- Built-in validators run on .save() / .validate()
|-- Custom: validate: { validator: v => v > 0, message: props => `${props.value} is invalid` }
|-- Cast errors / ValidationError
    try { await doc.save() } catch (err) { if (err.name === 'ValidationError') { ... } }
```

### 10. Modern Practices & 2025–2026 Updates (v9.x era)

```
|-- TypeScript-first (improved generics since v8/v9)
    import { Schema, model, Document } from 'mongoose'
    interface IUser extends Document { name: string; ... }
    const UserSchema = new Schema<IUser>({ ... })

|-- Zod / Joi integration for extra validation (many skip built-in for Zod)
|-- Lean queries + class-transformer for performance
|-- Transactions with session: await Model.create([...], { session })
|-- Change streams via Model.watch()
|-- Atlas Vector Search integration (via raw driver + Mongoose queries)
|-- Mongoose 9.x (Nov 2025+): Better Promise handling, stricter defaults, improved TypeScript, performance fixes
|-- Avoid overusing middleware for everything → prefer service layer logic
```

### Minimal Modern Mongoose Setup (ESM + TypeScript style – 2026)

```ts
// models/user.ts
import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  age?: number;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age: { type: Number, min: 0 },
}, {
  timestamps: true,
  toJSON: { virtuals: true, versionKey: false }
});

userSchema.virtual('isAdult').get(function() {
  return this.age >= 18;
});

userSchema.pre('save', async function(next) {
  // example: hash password if added
  next();
});

export const User = model<IUser>('User', userSchema);

// db.ts
import mongoose from 'mongoose';

export async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI!, {
    maxPoolSize: 20,
  });
  console.log('MongoDB connected');
}
```
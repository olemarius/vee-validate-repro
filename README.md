## Steps to reproduce

1. run `pnpm i`
2. run `dev` npm script in `apps/admin/package.json`
3. As you can see, the form works as expected, showing validation errors and outputting `values` correctly
4. Stop dev server and run `preview`
5. Now the form doesnt work. When typing username, values is not updated.

How to fix:
1. Open App.vue and comment out `import { useForm } from 'vee-validate';` then import useForm from `'@/components/ui/form'` instead. Full code:

```vue
<script setup lang="ts">
// import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useForm } from '@/components/ui/form';

const formSchema = toTypedSchema(z.object({
    username: z.string().min(2).max(50),
}));

const { handleSubmit, values } = useForm({
    validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
    console.log('submit!', values);
});
</script>

<template>
    <form class="w-2/3 space-y-6 m-8" @submit="onSubmit">
        <div class="grid grid-cols-2 gap-8">
            <div>
                <FormField v-slot="{ componentField }" name="username">
                    <FormItem>
                        <FormLabel>
                            Username:
                        </FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="shadcn" v-bind="componentField" />
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <Button type="submit">
                    Submit
                </Button>
            </div>
            <div>
                <code>
                    const { handleSubmit, <b>values</b> } = useForm({ ... });
                </code>
                <br>
                <br>
                <b>values from useForm():</b>
                <pre>{{ values }}</pre>
            </div>
        </div>
    </form>
</template>
``` 

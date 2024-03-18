<template>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
        <el-from :model="form" label-width="60px" ref="ruleFormRef" :rules="rules">
            <el-from-item label="书名" prop="BookName">
                <el-input v-model="form.BookName"/>
            </el-from-item>
            <el-from-item label="作者" prop="Author">
                <el-input v-model="form.Author" />
            </el-from-item>
            <el-from-item label="出版社" prop="Publisher">
                <el-input v-model="form.Publisher" />
            </el-from-item>
            <el-from-item label="类名" prop="TypeName">
                <el-input v-model="form.TypeName" />
            </el-from-item>
            <el-from-item label="备注" prop="Remarks">
                <el-input v-model="form.Remarks" />
            </el-from-item>
        </el-from>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeAdd(ruleFormRef)">取消</el-button>
                <el-button type="primary" @click="save(ruleFormRef)">确定</el-button>
            </span>
            
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { add, edit } from '../http/index'

const props = defineProps({
    isShow: Boolean,
    info:Object
})
const dialogVisible = computed(() => props.isShow)
const form = ref({
    Id:0,
    BookName:"",
    Author:"",
    TypeName:"",
    Publisher:"",
    Remarks:""
})
// 监听
watch(() => props.info, (newInfo) => {
    if(newInfo) {
        form.value = {
            Id: newInfo.Id,
            BookName: newInfo.BookName,
            Author: newInfo.Author,
            TypeName: newInfo.TypeName,
            Remarks: newInfo.Remarks
        }
    }
})
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    BookName:[ {required:true, message:'请输入书名', trigger:'blur'}],
    Author: [{required: true, message:'请输入作者', trigger:'blur'}],
    TypeName: [{required:true, message:'请输入类别', trigger:'blur'}]
})
const emits = defineEmits(['closeAdd', 'success'])
const closeAdd = async (formEl: FormInstance | undefined) => {
    if(!formEl) return
    formEl.resetFields()
    emits("closeAdd")
}
const save = async (formEl:FormInstance | undefined) => {
    if(!formEl) return
    await formEl.validate((valid, fields) => {
        if(valid) {
            if(form.value.Id){
                edit(form.value).then(function(res) {
                    if(res.data) {
                        emits("success", "修改成功！")
                    }
                })
            } else {
                add(form.value).then(function(res) {
                    if(res.data) {
                        emits("success", "修改成功！")
                    }
                })
            }
        }else{
            console.log('error submit', fields)
        }
    })
}
</script>
<style></style>
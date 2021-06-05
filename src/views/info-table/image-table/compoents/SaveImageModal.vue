<template>
  <Modal ref="saveImageModal" modal-id="saveImageModal" form-id="saveImageForm">
    <template #header>
      <BasicModalHeader class="blue">
        保存镜像
      </BasicModalHeader>
    </template>
    <BasicModalContent>
      <Form form-id="saveImageForm" :validate-rule="validateRule()" :success-callback="save">
        <LeftLabeledInputField :data.sync="form.name" name="name" label="名称" />
        <LeftLabeledInputField :data.sync="form.indicate" name="indicate" label="标识" />
        <LeftLabeledInputField :data.sync="form.description" name="description" label="描述" />
        <LeftLabeledInputField :data.sync="form.version" name="version" label="版本" />
        <LeftLabeledInputField :data.sync="form.userId" name="userId" label="用户ID" />
        <BasicField>
          <div class="ui toggle checkbox m-padded-tb tip-popup">
            <input id="share" v-model="form.share" data-content="是否共享此镜像" type="checkbox">
            <label for="share">是否共享</label>
          </div>
        </BasicField>
        <LeftLabeledField label="创建时间">
          <el-date-picker
            v-model="form.createTime"
            placeholder="选择创建的日期时间"
            type="datetime"
          />
        </LeftLabeledField>
        <input id="id" type="hidden">
      </Form>
    </BasicModalContent>
    <template #actions>
      <OkOrCancelModalActions />
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import BasicModalContent from '@/components/Modal/content/BasicModalContent'
import LeftLabeledInputField from '@/components/Form/field/LeftLabeledInputField'
import LeftLabeledField from '@/components/Form/field/LeftLabeledField'
import BasicField from '@/components/Form/field/BasicField'
import OkOrCancelModalActions from '@/components/Modal/actions/OkOrCancelModalActions'
import { FormValidation } from '@/model/FormValidation'
import { showSuccessToast } from '@/utils/publicUtils'
import Form from '@/components/Form'
import { saveImage } from '@/api/dockerserve/imageAPI'

export default {
  name: 'SaveImageModal',
  components: {
    Form,
    OkOrCancelModalActions,
    BasicField,
    LeftLabeledField,
    LeftLabeledInputField,
    BasicModalContent,
    BasicModalHeader,
    Modal
  },
  props: {
    image: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: this.getDefaultForm()
    }
  },
  methods: {
    /**
     * 初始化显示内容
     * @param image 镜像
     */
    init(image) {
      if (image) {
        this.form = image
      }
      this.$refs.saveImageModal.show()
    },
    /**
     * 保存修改结果
     */
    async save() {
      const { success } = await saveImage(this.form)
      if (success) {
        showSuccessToast({
          message: '保存镜像成功'
        })
        this.$emit('saveSuccess')
      }
    },
    /**
     * 获取默认的表单对象
     * @return 表单对象
     */
    getDefaultForm() {
      return {
        id: null,
        indicate: '',
        name: '',
        version: '',
        description: '',
        userId: '',
        share: false,
        createTime: new Date()
      }
    },
    /**
     * 设置镜像表单验证规则
     * @return 验证规则
     */
    validateRule() {
      return {
        name: FormValidation.nameStringRule({ fieldName: '名称', minLength: 4, maxLength: 16 }),
        userId: FormValidation.notEmptyRule('用户'),
        createTime: FormValidation.notEmptyRule('创建时间')
      }
    }
  }
}
</script>

<style scoped>

</style>

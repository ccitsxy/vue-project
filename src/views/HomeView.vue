<script setup lang="ts">
import { shallowRef } from 'vue'

import Button from '@/components/button/Button.vue'
import IconArrowUp from '@/components/icon/IconArrowUp.vue'
import Spin from '@/components/spin/Spin.vue'
import Divider from '@/components/divider/Divider.vue'
import Space from '@/components/space/Space.vue'
import Col from '@/components/grid/Col.vue'
import Row from '@/components/grid/Row.vue'
import Switch from '@/components/switch/Switch.vue'
import BackTop from '@/components/back-top/BackTop.vue'
import Icon from '@/components/icon/Icon.vue'
import Alert from '@/components/alert/Alert.vue'
import ButtonGroup from '@/components/button/ButtonGroup.vue'
import Checkbox from '@/components/checkbox/Checkbox.vue'

const checked = shallowRef(false)
</script>

<template>
  <Space wrap style="margin: 8px">
    <Button>主要按钮</Button>
    <Button type="secondary">次要按钮</Button>
    <Button type="tertiary">第三按钮</Button>
    <Button type="success">成功按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="danger">危险按钮</Button>

    <Button theme="solid" type="primary">深色主要</Button>
    <Button theme="solid" type="secondary">深色次要</Button>
    <Button theme="solid" type="tertiary">深色第三</Button>
    <Button theme="solid" type="success">深色成功</Button>
    <Button theme="solid" type="warning">深色警告</Button>
    <Button theme="solid" type="danger">深色危险</Button>

    <Button theme="borderless" type="primary">主要</Button>
    <Button theme="borderless" type="secondary">次要</Button>
    <Button theme="borderless" type="tertiary">第三</Button>
    <Button theme="borderless" type="success">成功</Button>
    <Button theme="borderless" type="warning">警告</Button>
    <Button theme="borderless" type="danger">危险</Button>

    <Button disabled theme="borderless">无背景禁用</Button>
    <Button disabled theme="light">浅色禁用</Button>
    <Button disabled theme="borderless" type="primary">无背景主要禁用</Button>
    <Button disabled theme="solid" type="warning">深色警告禁用</Button>

    <Button size="large">大尺寸</Button>
    <Button>默认尺寸</Button>
    <Button size="small">小尺寸</Button>

    <Button block>块级按钮</Button>

    <Button :icon="IconArrowUp" size="small" />

    <Button disabled :icon="IconArrowUp" />

    <Button type="primary" :icon="IconArrowUp" />
    <Button type="secondary" :icon="IconArrowUp" />
    <Button type="warning" :icon="IconArrowUp" />
    <Button type="danger" :icon="IconArrowUp" />

    <ButtonGroup size="large" shape="round">
      <Button type="secondary">次要按钮</Button>
      <Button type="tertiary">第三按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
    </ButtonGroup>

    <Button :icon="IconArrowUp" theme="solid" shape="round" />
    <Button :icon="IconArrowUp" theme="light" />

    <Button :icon="IconArrowUp" theme="solid">收起</Button>
    <Button :icon="IconArrowUp" theme="solid" icon-placement="end">展开选项</Button>

    <Button loading>保存</Button>

    <Button loading type="danger" :icon="IconArrowUp">删除</Button>

    <Button loading type="warning" block theme="solid">撤销</Button>

    <Divider margin="12px" align="start"> 这是居左文字 </Divider>

    <Divider margin="12px" align="center"> 这是居中文字 </Divider>

    <Divider margin="12px" align="end"> 这是居右文字 </Divider>

    <Divider margin="12px">
      <IconArrowUp />
    </Divider>

    <Row style="background-color: var(--c-danger-color); text-align: center; color: white">
      <Col :span="6" style="background-color: var(--c-success-color)">col-6</Col>
      <Col :span="6" style="background-color: var(--c-success-color)">col-6</Col>
      <Col :span="6" :offset="6" style="background-color: #3bb346">col-6 offset-6</Col>
    </Row>
    <Row style="background-color: #f93920; text-align: center; color: white">
      <Col :span="6" :push="6" style="background-color: var(--c-success-color)">col-6 push-6</Col>
      <Col :span="6" :pull="6" style="background-color: var(--c-success-color)">col-6 pull-6</Col>
    </Row>
    <Switch v-model:checked="checked" size="small" />
    <Switch v-model:checked="checked" />
    <Switch v-model:checked="checked" size="large" />

    <Switch v-model:checked="checked" size="small" loading />
    <Switch v-model:checked="checked" loading />
    <Switch v-model:checked="checked" size="large" loading />

    <Switch v-model:checked="checked" checked-text="开" unchecked-text="关" />
    <Switch v-model:checked="checked" disabled checked-text="开" unchecked-text="关" />
    <Switch v-model:checked="checked" disabled>
      <template #checkedText> 开 </template>
      <template #uncheckedText> 关 </template>
    </Switch>

    <Icon :component="IconArrowUp" />

    <Alert
      type="info"
      title="A pre-released version is available."
      description="A pre-released version is available."
    />
    <Alert
      bordered
      type="danger"
      description="This version of the document is going to expire after 4 days."
    />
    <Alert
      :show-icon="false"
      bordered
      type="warning"
      banner
      description="This version of the document is going to expire after 4 days."
    />

    <div style="height: fit-content; width: fit-content">
      <Spin :delay="2000" size="large">
        <template #tip> I am loading... </template>
        <div
          style="
            border: 1px solid var(--c-primary-color);
            border-radius: 6px;
            padding-inline-start: 8px;
          "
        >
          <p>Here are some texts.</p>
          <p>And more texts on the way.</p>
        </div>
      </Spin>
    </div>
    <Checkbox v-model:checked="checked">
      {{ checked ? 'checked' : 'unchecked' }}
      <template #describe>
        <div>Here are some texts.</div>
        <div>And more texts on the way.</div>
      </template>
    </Checkbox>
  </Space>
  <div style="height: 2000px" />
  <BackTop />
</template>

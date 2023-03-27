<script setup lang="ts">
import Button from '@/components/button/Button.vue'
import IconFont from '@/components/icon/IconFont.vue'
import Spin from '@/components/spin/Spin.vue'
import Divider from '@/components/divider/Divider.vue'
</script>

<template>
  <Button>主要按钮</Button>
  <Button status="secondary">次要按钮</Button>
  <Button status="tertiary">第三按钮</Button>
  <Button status="success">成功按钮</Button>
  <Button status="warning">警告按钮</Button>
  <Button status="danger">危险按钮</Button>

  <Button theme="solid" status="primary">深色主要</Button>
  <Button theme="solid" status="secondary">深色次要</Button>
  <Button theme="solid" status="tertiary">深色第三</Button>
  <Button theme="solid" status="success">深色成功</Button>
  <Button theme="solid" status="warning">深色警告</Button>
  <Button theme="solid" status="danger">深色危险</Button>

  <Button theme="borderless" status="primary">主要</Button>
  <Button theme="borderless" status="secondary">次要</Button>
  <Button theme="borderless" status="tertiary">第三</Button>
  <Button theme="borderless" status="success">成功</Button>
  <Button theme="borderless" status="warning">警告</Button>
  <Button theme="borderless" status="danger">危险</Button>

  <Button disabled theme="borderless">无背景禁用</Button>
  <Button disabled theme="light">浅色禁用</Button>
  <Button disabled theme="borderless" status="primary">无背景主要禁用</Button>
  <Button disabled theme="solid" status="warning">深色警告禁用</Button>

  <Button size="large">大尺寸</Button>
  <Button size="default">默认尺寸</Button>
  <Button size="small">小尺寸</Button>

  <Button block>块级按钮</Button>

  <Button :icon="IconFont" size="small" />

  <Button disabled :icon="IconFont" />

  <Button status="primary" :icon="IconFont" />
  <Button status="secondary" :icon="IconFont" />
  <Button status="warning" :icon="IconFont" />
  <Button status="danger" :icon="IconFont" />

  <Button :icon="IconFont" theme="solid" />
  <Button :icon="IconFont" theme="light" />

  <Button :icon="IconFont" theme="solid">收起</Button>
  <Button :icon="IconFont" theme="solid" icon-placement="right">展开选项</Button>

  <Button loading>保存</Button>

  <Button loading status="danger" :icon="IconFont">删除</Button>

  <Button loading status="warning" block theme="solid">撤销</Button>

  <Divider margin="12px">
    <span>左</span>
    <Divider direction="vertical" margin="12px" />
    <span>中</span>
    <Divider direction="vertical" margin="12px" />
    <span>右</span>
  </Divider>

  <Divider margin="12px" align="left"> 这是居左文字 </Divider>

  <Divider margin="12px" align="center"> 这是居中文字 </Divider>

  <Divider margin="12px" align="right"> 这是居右文字 </Divider>

  <Divider margin="12px">
    <IconFont />
  </Divider>

  <div style="height: 120px; width: 120px">
    <Spin :delay="2000" size="large">
      <template #tip> I am loading... </template>
      <div
        style="border: 1px solid var(--semi-color-primary); border-radius: 4px; padding-left: 8px"
      >
        <p>Here are some texts.</p>
        <p>And more texts on the way.</p>
      </div>
    </Spin>
  </div>
</template>

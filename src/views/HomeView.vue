<script setup lang="ts">
import Button from '@/components/button/Button.vue'
import IconArrowDown from '@/components/icon/IconArrowDown.vue'
import Spin from '@/components/spin/Spin.vue'
import Divider from '@/components/divider/Divider.vue'
import Space from '@/components/space/Space.vue'
</script>

<template>
  <Space wrap style="margin: 8px">
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

    <Button :icon="IconArrowDown" size="small" />

    <Button disabled :icon="IconArrowDown" />

    <Button status="primary" :icon="IconArrowDown" />
    <Button status="secondary" :icon="IconArrowDown" />
    <Button status="warning" :icon="IconArrowDown" />
    <Button status="danger" :icon="IconArrowDown" />

    <Button :icon="IconArrowDown" theme="solid" />
    <Button :icon="IconArrowDown" theme="light" />

    <Button :icon="IconArrowDown" theme="solid">收起</Button>
    <Button :icon="IconArrowDown" theme="solid" icon-placement="end">展开选项</Button>

    <Button loading>保存</Button>

    <Button loading status="danger" :icon="IconArrowDown">删除</Button>

    <Button loading status="warning" block theme="solid">撤销</Button>

    <Divider margin="12px" align="start"> 这是居左文字 </Divider>

    <Divider margin="12px" align="center"> 这是居中文字 </Divider>

    <Divider margin="12px" align="end"> 这是居右文字 </Divider>

    <Divider margin="12px">
      <IconArrowDown />
    </Divider>

    <div style="height: fit-content; width: fit-content">
      <Spin :delay="2000" size="large">
        <template #tip> I am loading... </template>
        <div
          style="border: 1px solid var(--c-primary-color); border-radius: 4px; padding-inline-start;: 8px"
        >
          <p>Here are some texts.</p>
          <p>And more texts on the way.</p>
          <div class="greetings">
            <h1>You did it!</h1>
          </div>
        </div>
      </Spin>
    </div>
  </Space>
</template>

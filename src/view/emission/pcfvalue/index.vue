<template>
  <div class="big_box">
    <div class="top">
      <p class="title" @click="goBack(-3)">{{ $t("Factory_Emission2") }}</p>
      <p class="title add_margin">/</p>
      <p class="title add_margin" @click="goBack(-2)">
        {{ $t("Emission_History") }}
      </p>
      <p class="title add_margin">/</p>
      <p class="title add_margin" @click="goBack(-1)">
        {{ $t("More_Details_C") }}
      </p>
      <p class="change_color">/</p>
      <p class="change_color">{{ $t("Specific_PCF_Value") }}</p>
    </div>
    <div class="content_box">
      <div class="top_title">
        <p class="title">
          Product ID：{{ formInline.product_id }}
          <span style="margin-left: 20px">{{ $t("Specific_PCF_Value") }}</span>
        </p>
        <div class="export">
          <p class="export_icon"></p>
          <p class="export_text">{{ $t("Table_Export") }}</p>
        </div>
      </div>
      <div class="form_box">
        <Form
          ref="formInline"
          :model="formInline"
          inline
          :label-width="90"
          label-position="right"
        >
          <FormItem prop="productId" :label="$t('BOM_Line_Ti')">
            <Input
              type="text"
              v-model="formInline.bom_line_ti"
              :placeholder="$t('BOM_Line_Ti')"
            ></Input>
          </FormItem>
          <FormItem prop="productId" :label="$t('Suppliers')">
            <Input
              type="text"
              v-model="formInline.suppliers"
              :placeholder="$t('Suppliers')"
            ></Input>
          </FormItem>
        </Form>
        <Button icon="ios-search" type="primary" @click="getData">{{
          $t("Search")
        }}</Button>
      </div>
      <div class="table_box">
        <Table :columns="columns1" :data="data1">
          <template slot-scope="{ index }" slot="tableIndex">
            <span>{{
              formInline.page_number == 1
                ? index + 1
                : (index + 1) * ((formInline.page_number - 1) * 10)
            }}</span>
          </template>
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row }" slot="pcf">
            <span>{{ row.pcf && Number(row.pcf).toFixed(3) }}kg CO2e</span>
          </template>
        </Table>
      </div>
      <div class="page_box">
        <Page :total="formInline.page_total" size="small" />
      </div>
    </div>
  </div>
</template>
<script>
import { getDetailBom } from "@/api/home";
export default {
  data() {
    return {
      formInline: {
        product_id: "",
        bom_line_ti: "",
        suppliers: "",
        page_size: 10,
        page_number: 1,
        page_total: null,
      },
      columns1: [
        {
          align: "center",
          title: this.$t("No"),
          key: "number",
          slot: "tableIndex",
        },
        {
          title: this.$t("BOM_Line_Ti"),
          align: "center",
          key: "ti",
        },
        {
          title: this.$t("Suppliers"),
          align: "center",
          key: "suppliers",
        },
        {
          title: this.$t("Commodity"),
          align: "center",
          key: "commodity",
        },
        {
          title: this.$t("PCF_VALUE"),
          align: "center",
          key: "pcf",
          slot: "pcf",
        },
      ],
      data1: [
        {
          number: "123123",
          ti: "345234523423234",
          suppliers: "2016-10-03",
          commodity: "12312",
          pcf: "123123.4423423",
        },
      ],
    };
  },
  created() {
    this.formInline.product_id = this.$route.params.id;
    // this.data1 = this.data1.map(item=>{
    //     item.pcf = item.pcf+'kg CO2e'
    // })
    console.log(this.data1, "////");
    console.log("[]===", this.data1);
    this.getData();
  },
  methods: {
    /**
         * "number": "string",
        "ti": "string",
        "suppliers": "string",
        "commodity": "string",
        "pcf": 0
         */
    getData() {
      getDetailBom({ ...this.formInline }).then((res) => {
        if (res.data.code == 200) {
          this.formInline.page_total =
            res.data.data.pagination.page_total *
            res.data.data.pagination.page_size;
          this.data1 = res.data.data.items;
        }
      });
    },
    goBack(steps) {
      this.$router.go(steps);
    },
    // doSearch() {

    // }
  },
};
</script>
<style lang="less" scoped>
.big_box {
  .top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title {
      font-size: 14px;
      color: #00183c;
      position: relative;
    }
    // .title::after {
    //     content: "";
    //     display: block;
    //     width: 30px;
    //     height: 2px;
    //     position: absolute;
    //     bottom: -5px;
    //     left: 0;
    //     background: #11435C;
    //     opacity: 0.12;
    // }
    .add_margin {
      margin-left: 15px;
    }
    .change_color {
      color: #999999;
      margin-left: 15px;
      font-size: 14px;
    }
    p {
      cursor: pointer;
    }
  }
  .content_box {
    padding: 20px;
    background: #fff;
    margin-top: 20px;
    .top_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 18px;
        color: #11435c;
        position: relative;
      }
      .title::after {
        content: "";
        display: block;
        width: 30px;
        height: 2px;
        position: absolute;
        bottom: -5px;
        left: 0;
        background: #11435c;
        opacity: 0.12;
      }
      .export {
        display: flex;
        align-items: center;
        cursor: pointer;
        .export_icon {
          width: 14px;
          height: 14px;
          background: url("../../../assets/images/Vector.svg") no-repeat center;
          background-size: cover;
          // color: #006D80;
        }
        .export_text {
          color: #006d80;
          font-size: 14px;
          margin-left: 10px;
        }
      }
    }
    .form_box {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 30px;
      border-bottom: 1px solid #cdcdcd;
      .ivu-form-inline {
        ::v-deep {
          .ivu-form-item {
            border: 1px solid #11435c;
            .ivu-form-item-label {
              font-size: 14px;
              height: 40px;
              line-height: 20px;
            }
            .ivu-form-item-content {
              .ivu-input-type {
                .ivu-input-inner-container {
                  width: 240px;
                  .ivu-input {
                    border-radius: 0;
                    border: none;
                    border-left: 1px solid #dcdee2;
                    outline: none;
                    height: 40px;
                    line-height: 40px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .table_box {
      .ivu-table-wrapper {
        .ivu-table {
          .ivu-table-body {
            .ivu-table-row {
              .ivu-table-cell {
                div {
                  .ivu-btn-text {
                    color: #006d80;
                  }
                  .ivu-btn {
                    outline: none;
                    border: none !important;
                  }
                  .ivu-btn:hover {
                    background: none;
                    border: none;
                    box-shadow: none;
                  }
                  .ivu-btn:focus {
                    background: none;
                    border: none;
                    box-shadow: none;
                  }
                  .ivu-btn:active {
                    background: none;
                    border: none;
                    box-shadow: none;
                  }
                }
              }
            }
          }
        }
      }
    }
    .page_box {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
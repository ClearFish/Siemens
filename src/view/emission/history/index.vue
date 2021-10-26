<template>
  <div class="big_box">
    <div class="top">
      <p class="title" @click="goBack">{{ $t("Factory_Emission2") }}</p>
      <p class="change_color">/</p>
      <p class="change_color">{{ $t("Emission_History") }}</p>
    </div>
    <div class="content_box">
      <div class="top_title">
        <p class="title">{{ $t("Emission_History") }}</p>
        <div class="export">
          <p class="export_icon"></p>
          <p class="export_text">{{ $t("Table_Export") }}</p>
        </div>
      </div>
      <div class="form_box">
        <Form ref="formInline" :model="formInline" inline :label-width="100">
          <FormItem prop="productId" :label="$t('Product_Id')">
            <Input
              type="text"
              v-model="formInline.product_id"
              :placeholder="$t('Product_Id')"
            ></Input>
          </FormItem>
          <FormItem prop="productId" :label="$t('Serial_No')">
            <Input
              type="text"
              v-model="formInline.serial"
              :placeholder="$t('Serial_No')"
            ></Input>
          </FormItem>

          <FormItem prop="productId" :label="$t('Start_Time')">
            <DatePicker
              type="date"
              :placeholder="$t('Select_start_date')"
              style="width: 200px"
              v-model="formInline.start_datetime"
              :options="options"
              format="yyyy-MM-dd"
            ></DatePicker>
          </FormItem>
          <FormItem prop="productId" :label="$t('End_Time')">
            <DatePicker
              type="date"
              format="yyyy-MM-dd"
              :placeholder="$t('Select_end_date')"
              style="width: 200px"
              :options="options"
              v-model="formInline.end_datetime"
            ></DatePicker>
          </FormItem>
        </Form>
        <Button icon="ios-search" type="primary" @click="searchData">{{
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
          <template slot-scope="{ row }" slot="date">
            <span>{{ timestampToTime(row.pcf_calculation_datetime) }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button
              type="text"
              size="small"
              @click="gotoDetails(row.product_id, row.serial, index)"
              >{{ $t("More_Details") }}</Button
            >
          </template>
          <template slot-scope="{ row }" slot="pcf_total">
            <span
              >{{ row.pcf_total && Number(row.pcf_total).toFixed(3) }}kg
              CO2e</span
            >
          </template>
        </Table>
      </div>
      <div class="page_box">
        <Page
          :total="formInline.page_total"
          size="small"
          @on-change="changePageNumber"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getHistory } from "@/api/home";
export default {
  data() {
    return {
      formInline: {
        product_id: "",
        serial: "",
        start_datetime: "",
        end_datetime: "",
        page_size: 10,
        page_number: 1,
        page_total: 2,
      },
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        },
      },
      columns1: [
        {
          // type: "index",
          key: "number",
          width: 60,
          align: "center",
          title: this.$t("No"),
          slot: "tableIndex",
        },
        {
          title: this.$t("Product_Id"),
          align: "center",
          key: "product_id",
        },
        {
          title: this.$t("Serial_No"),
          align: "center",
          key: "serial",
        },
        {
          title: this.$t("Generation_Time"),
          align: "center",
          key: "pcf_calculation_datetime",
          slot: "date",
        },
        {
          title: this.$t("PCF_VALUE"),
          align: "center",
          key: "pcf_total",
          slot: "pcf_total",
        },
        {
          title: this.$t("Details"),
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      data1: [
        {
          number: 0,
          product_id: "123123",
          serial: "345234523423234",
          pcf_calculation_datetime: "2016-10-03",
          pcf_total: 0.00326565,
        },
      ],
    };
  },
  created() {
    this.searchData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    gotoDetails(id, serial) {
      this.$router.push({
        path: "/emission/history/details",
        query: {
          id: id,
          serial: serial,
        },
      });
    },
    timestampToTime(timestamp) {
      console.log(timestamp, this.detailData, "[]===");
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      console.log(date, "[][]");
      var Y = date.getFullYear() + "-";
      console.log(Y, "===");
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    searchData() {
      console.log(this.formInline, "/.//");
      var obj = {
        product_id: this.formInline.product_id,
        serial: this.formInline.serial,
        start_datetime: this.formInline.start_datetime
          ? this.formInline.start_datetime.getTime() / 1000
          : null,
        end_datetime: this.formInline.end_datetime
          ? this.formInline.end_datetime.getTime() / 1000
          : null,
        page_size: 10,
        page_number: this.formInline.page_number,
      };
      getHistory({ ...obj }).then((res) => {
        if (res.data.code == 200) {
          this.formInline.page_total =
            res.data.data.pagination.page_total *
            res.data.data.pagination.page_size;
          this.formInline.page_number = res.data.data.pagination.page_number;
          this.data1 = res.data.data.items;
        }
      });
    },
    changePageNumber(val) {
      this.formInline.page_number = val;
      this.searchData();
    },
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
      cursor: pointer;
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

    .change_color {
      color: #999999;
      margin-left: 15px;
      font-size: 14px;
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
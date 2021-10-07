<template>
    <div class="big_box">
        <div class="top">
            <p class="title">Factory Emission</p>
            <p class="change_color">/</p>
            <p class="change_color">Emission History</p>
        </div>
        <div class="content_box">
            <div class="top_title">
                <p class="title">Emission History</p>
                <div class="export">
                    <p class="export_icon"></p>
                    <p class="export_text">Table Export</p>
                </div>
            </div>
            <div class="form_box">
                <Form ref="formInline" :model="formInline" inline :label-width="80">
                    <FormItem prop="productId" label="Product Id">
                        <Input type="text" v-model="formInline.productId" placeholder="Product ID"></Input>
                    </FormItem>
                    <FormItem prop="productId" label="Serial No">
                        <Input type="text" v-model="formInline.serialNo" placeholder="Serial No"></Input>
                    </FormItem>
                    
                    <FormItem prop="productId" label="Start Time">
                        <!-- <Input type="text" v-model="formInline.startTime" placeholder="Product ID"></Input> -->
                        <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                    </FormItem>
                    <FormItem prop="productId" label="End Time">
                        <!-- <Input type="text" v-model="formInline.startTime" placeholder="Product ID"></Input> -->
                        <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                    </FormItem>
                </Form>
                <Button icon="ios-search" type="primary">Search</Button>
            </div>
            <div class="table_box">
                 <Table :columns="columns1" :data="data1">
                     <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="text" size="small" @click="gotoDetails(row.ProductID)">More Details</Button>
                    </template>
                 </Table>
            </div>
            <div class="page_box">
                <Page :total="40" size="small"/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formInline:{
                productId:''
            },
            columns1: [
                    {
                       type: 'index',
                        width: 60,
                        align: 'center',
                        title: 'No.',
                    },
                    {
                        title: 'Product ID',
                         align: 'center',
                        key: 'ProductID'
                    },
                    {
                        title: 'Serial No',
                         align: 'center',
                        key: 'SerialNo'
                    },
                    {
                        title: 'Generation Time',
                         align: 'center',
                        key: 'GenerationTime'
                    },
                    {
                        title: 'PCF VALUE',
                         align: 'center',
                        key: 'PCFVALUE'
                    },
                    {
                        title: 'Details',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
            data1: [
                {
                    ProductID: '123123',
                    SerialNo: '345234523423234',
                    GenerationTime: '2016-10-03',
                    PCFVALUE:"asdasdasd123"
                },
                {
                    ProductID: '123123',
                    SerialNo: '345234523423234',
                    GenerationTime: '2016-10-03',
                    PCFVALUE:"asdasdasd123"
                },
                {
                    ProductID: '123123',
                    SerialNo: '345234523423234',
                    GenerationTime: '2016-10-03',
                    PCFVALUE:"asdasdasd123"
                },
                {
                    ProductID: '123123',
                    SerialNo: '345234523423234',
                    GenerationTime: '2016-10-03',
                    PCFVALUE:"asdasdasd123"
                },
                {
                    ProductID: '123123',
                    SerialNo: '345234523423234',
                    GenerationTime: '2016-10-03',
                    PCFVALUE:"asdasdasd123"
                },
                {
                    ProductID: '123123',
                    SerialNo: '345234523423234',
                    GenerationTime: '2016-10-03',
                    PCFVALUE:"asdasdasd123"
                },
                {
                    ProductID: '123123',
                    SerialNo: '345234523423234',
                    GenerationTime: '2016-10-03',
                    PCFVALUE:"asdasdasd123"
                },
                {
                    ProductID: '123123',
                    SerialNo: '345234523423234',
                    GenerationTime: '2016-10-03',
                    PCFVALUE:"asdasdasd123"
                },
                {
                    ProductID: '123123',
                    SerialNo: '345234523423234',
                    GenerationTime: '2016-10-03',
                    PCFVALUE:"asdasdasd123"
                },
            ]
        }
    },
    methods:{
        gotoDetails(id) {
            // this.$router.push({
            //     name:"/emission/history/details",
            //     query:id
            // })
            this.$router.push('/emission/history/details/'+id)
        }
    }
}
</script>
<style lang="less" scoped>
.big_box {
    .top {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .title {
            font-size: 14px;
            color: #00183C;
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
                color: #11435C;
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
                background: #11435C;
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
                    color: #006D80;
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
                    .ivu-form-item{
                        border: 1px  solid #11435C;
                        .ivu-form-item-label {
                            font-size: 14px;
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
                                        color: #006D80;
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
            margin-top:20px;
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>
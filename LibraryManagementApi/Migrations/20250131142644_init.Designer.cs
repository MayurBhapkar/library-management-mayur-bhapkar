﻿// <auto-generated />
using System;
using LibraryManagementApi.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LibraryManagementApi.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20250131142644_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.36")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("LibraryManagementApi.Entities.Book", b =>
                {
                    b.Property<int>("id")
                        .HasColumnType("int");

                    b.Property<string>("author")
                        .IsRequired()
                        .HasColumnType("varchar(30)");

                    b.Property<int>("availableStock")
                        .HasColumnType("int");

                    b.Property<string>("category")
                        .IsRequired()
                        .HasColumnType("varchar(30)");

                    b.Property<bool>("isDel")
                        .HasColumnType("bit");

                    b.Property<string>("nm")
                        .IsRequired()
                        .HasColumnType("varchar(30)");

                    b.Property<string>("publication")
                        .IsRequired()
                        .HasColumnType("varchar(30)");

                    b.Property<int>("stock")
                        .HasColumnType("int");

                    b.Property<string>("year")
                        .IsRequired()
                        .HasColumnType("varchar(10)");

                    b.HasKey("id");

                    b.ToTable("Books");
                });

            modelBuilder.Entity("LibraryManagementApi.Entities.BookIssue", b =>
                {
                    b.Property<int>("id")
                        .HasColumnType("int");

                    b.Property<int>("bookId")
                        .HasColumnType("int");

                    b.Property<DateTime>("date")
                        .HasColumnType("DateTime");

                    b.Property<DateTime>("duedate")
                        .HasColumnType("DateTime");

                    b.Property<bool>("isDel")
                        .HasColumnType("bit");

                    b.Property<bool>("isReturn")
                        .HasColumnType("bit");

                    b.Property<int>("memberId")
                        .HasColumnType("int");

                    b.Property<string>("remark")
                        .HasColumnType("varchar(100)");

                    b.Property<DateTime?>("returnDate")
                        .HasColumnType("DateTime");

                    b.HasKey("id");

                    b.HasIndex("bookId");

                    b.HasIndex("memberId");

                    b.ToTable("BookIssues");
                });

            modelBuilder.Entity("LibraryManagementApi.Entities.Member", b =>
                {
                    b.Property<int>("id")
                        .HasColumnType("int");

                    b.Property<string>("address")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<DateTime>("admissionDate")
                        .HasColumnType("DateTime");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("varchar(20)");

                    b.Property<string>("mobile")
                        .IsRequired()
                        .HasColumnType("varchar(10)");

                    b.Property<string>("nm")
                        .IsRequired()
                        .HasColumnType("varchar(30)");

                    b.HasKey("id");

                    b.ToTable("Members");
                });

            modelBuilder.Entity("LibraryManagementApi.Entities.user", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("pwd")
                        .IsRequired()
                        .HasColumnType("varchar(20)");

                    b.Property<string>("unm")
                        .IsRequired()
                        .HasColumnType("varchar(20)");

                    b.HasKey("Id");

                    b.ToTable("users");
                });

            modelBuilder.Entity("LibraryManagementApi.Entities.BookIssue", b =>
                {
                    b.HasOne("LibraryManagementApi.Entities.Book", "Book")
                        .WithMany()
                        .HasForeignKey("bookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LibraryManagementApi.Entities.Member", "Member")
                        .WithMany()
                        .HasForeignKey("memberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Book");

                    b.Navigation("Member");
                });
#pragma warning restore 612, 618
        }
    }
}
